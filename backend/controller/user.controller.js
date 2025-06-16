import FriendRequest from "../models/friendRequest.model.js";
import { User } from "../models/user.models.js";

export const RecommendedUsers = async (req, res) => {
  try {
    const { _id: currentUserId } = req.user;
    const currentUser = req.user;
    const recommendUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current friend user
        { _id: { $nin: currentUser.friend } }, //exclude current friend user
        { isOnBoard: true }, //
      ],
    });
    res.status(200).json(recommendUser);
  } catch (error) {
    console.error("Recommneded Controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// All Friends
export const getMyFriends = async (req, res) => {
  try {
    const { _id: currentUserId } = req.user;
    const currentUser = req.user;

    const friendslist = await User.findById(currentUserId)
      .select("friends")
      .populate(
        "friends",
        "fullname nativeLanguage profilePic learningLanguage"
      );

    res.status(200).json(friendslist);
  } catch (error) {
    console.error("Recommneded Controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Send Friend Request
export const SendFriendRequest = async (req, res) => {
  try {
    const { id: reciepiantId } = req.params;
    const myId = req.user._id;
    if (reciepiantId == myId) {
      return res.status(400).json({ message: "Request not send to own id." });
    }

    const recipient = await User.findById(reciepiantId);
    // console.log(recipient);
    if (recipient?.friends?.includes(myId)) {
      res.status(404).json({ message: "You both are friend already." });
    }

    const existingUser = await FriendRequest.findOne({
      $or: [
        { recipient: myId, sender: reciepiantId },
        { sender: myId, recipient: reciepiantId },
      ],
    });

    if (existingUser) {
      return res.status(404).json({ message: "Friend request already exist" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: reciepiantId,
      status: "pending",
    });

    res.status(200).json(friendRequest);
  } catch (error) {
    console.error("SendFriendRequest Controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// // AcceptFriendRequest
export const AcceptFriendRequest = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { id: recipientId } = req.params; // ✅ Fixed typo "reciepientId"

    // ✅ Find the friend request where current user is the sender
    const friendRequest = await FriendRequest.findOne({
      recipient: recipientId,
      sender: currentUserId,
    });

    if (!friendRequest) {
      return res
        .status(404)
        .json({ message: "Friend request does not exist." });
    }

    // ✅ Update status
    friendRequest.status = "accepted";
    await friendRequest.save();

    // ✅ Add each user to the other's friends list (avoid duplicates)
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: recipientId },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: currentUserId },
    });

    await FriendRequest.findByIdAndDelete(recipientId);
    res.json({ message: "Friend request accepted." });
  } catch (error) {
    console.error("AcceptFriendRequest Controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Friend Request

export const getFriendRequest = async (req, res) => {
  try {
    const incomingRequest = await User.FriendRequest({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullname nanativeLanguage  learningLanguage profilePic"
    );

    const acceptRequest = await User.FriendRequest({
      recipient: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullname profilePic");

    return res.json({ incomingRequest, acceptRequest });
  } catch (error) {
    console.error("getFriendRequest Controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// out Going friend request
export const outgoingFriendRequest = async (req, res) => {
  try {
    const outgoingRequest = await User.FriendRequest({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullname nanativeLanguage  learningLanguage profilePic"
    );

    return res.json({ outgoingRequest });
  } catch (error) {
    console.error("outgoingFriendRequest Controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

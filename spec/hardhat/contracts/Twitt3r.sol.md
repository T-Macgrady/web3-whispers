# Twitt3r Contract

The `Twitt3r` contract is a simple implementation of a Twitter-like social media platform on the Ethereum blockchain. It allows users to create and post tweets, as well as follow and unfollow other users.

## Data Structures

### Tweet

A `Tweet` struct represents a single tweet on the platform. It contains the following fields:

- `id` (uint256): a unique identifier for the tweet
- `author` (address): the Ethereum address of the user who created the tweet
- `text` (string): the text content of the tweet
- `timestamp` (uint256): the Unix timestamp of when the tweet was created

### User

A `User` struct represents a user on the platform. It contains the following fields:

- `id` (uint256): a unique identifier for the user
- `address` (address): the Ethereum address of the user
- `username` (string): the username chosen by the user
- `followers` (address[]): an array of Ethereum addresses representing the users who follow this user
- `following` (address[]): an array of Ethereum addresses representing the users who this user follows

## State Variables

The `Twitt3r` contract has the following state variables:

- `tweets` (Tweet[]): an array of all tweets on the platform
- `users` (mapping(address => User)): a mapping of Ethereum addresses to user objects

## Events

The `Twitt3r` contract emits the following events:

### TweetPosted

Emitted when a new tweet is posted on the platform.

```solidity
event TweetPosted(uint256 indexed id, address indexed author, string text, uint256 timestamp);
```

### UserFollowed

Emitted when a user is followed by another user.

```solidity
event UserFollowed(address indexed follower, address indexed followed);
```

### UserUnfollowed

Emitted when a user is unfollowed by another user.

```solidity
event UserUnfollowed(address indexed follower, address indexed unfollowed);
```

## Functions

### postTweet

Creates a new tweet on the platform.

```solidity
function postTweet(string memory _text) public;
```

- `_text` (string): the text content of the tweet

### followUser

Follows another user on the platform.

```solidity
function followUser(address _user) public;
```

- `_user` (address): the Ethereum address of the user to follow

### unfollowUser

Unfollows a user on the platform.

```solidity
function unfollowUser(address _user) public;
```

- `_user` (address): the Ethereum address of the user to unfollow

### getTweet

Returns the details of a tweet on the platform.

```solidity
function getTweet(uint256 _id) public view returns (uint256 id, address author, string memory text, uint256 timestamp);
```

- `_id` (uint256): the unique identifier of the tweet

### getUser

Returns the details of a user on the platform.

```solidity
function getUser(address _address) public view returns (uint256 id, address userAddress, string memory username, address[] memory followers, address[] memory following);
```

- `_address` (address): the Ethereum address of the user

## Modifiers

### userExists

Checks that a user exists on the platform.

```solidity
modifier userExists(address _address) {
    require(users[_address].id != 0, "User does not exist");
    _;
}
```

- `_address` (address): the Ethereum address of the user to check

### tweetExists

Checks that a tweet exists on the platform.

```solidity
modifier tweetExists(uint256 _id) {
    require(_id > 0 && _id <= tweets.length, "Tweet does not exist");
    _;
}
```

- `_id` (uint256): the unique identifier of the tweet to check

### userNotFollowed

Checks that a user is not already followed by the current user.

```solidity
modifier userNotFollowed(address _user) {
    require(!isFollowing(_user), "User is already followed");
    _;
}
```

- `_user` (address): the Ethereum address of the user to check

### userNotUnfollowed

Checks that a user is not already unfollowed by the current user.

```solidity
modifier userNotUnfollowed(address _user) {
    require(isFollowing(_user), "User is not followed");
    _;
}
```

- `_user` (address): the Ethereum address of the user to check

## Internal Functions

### isFollowing

Checks if the current user is following another user.

```solidity
function isFollowing(address _user) internal view returns (bool) {
    User storage currentUser = users[msg.sender];
    for (uint i = 0; i < currentUser.following.length; i++) {
        if (currentUser.following[i] == _user) {
            return true;
        }
    }
    return false;
}
```

- `_user` (address): the Ethereum address of the user to check
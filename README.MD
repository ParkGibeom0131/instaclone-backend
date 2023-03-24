# Instaclone

Instaclone Backend.

## User :

- [✔] Create Account
- [✔] See Profile
- [✔] Login
- [✔] Edit Profile
- [✔] Change Avatar (Image Upload)
- [✔] Follow User
- [✔] Unfollow User
- [✔] See Followers with Offset Pagination
- [✔] See Following with Cursor Based Pagination
- [✔] Computed Fields
- [✔] Search Users

## Photos :

- [✔] Upload Photo (Parse #)
- [✔] See Photo
- [✔] See Hashtags
- [✔] Search Photos
- [✔] Edit Photo
- [✔] Like / Unlike Photo
- [✔] See Photo Likes
- [✔] See Feed
- [✔] See Photo Comments
- [✔] Is Mine (Delete Photo)
- [✔] Delete Photo

## Comments :

- [✔] Comment on Photo
- [✔] Delete Comment (Is Mine)
- [✔] Edit Comment

## Refactor :

- [✔] Mutation Responses

## Extras :

- [✔] S3 Image Upload

## DMs :

- [✔] See Room
- [✔] Send Message (Create Room)
- [✔] See Rooms
- [✔] Computed Fields
- [✔] See (Read) Message
- [✔] Realtime Messages

<pre><code>{
    rooms {
        users {
            avatar
            username
        }
        unreadNumber
    }
    room {
        users {
            avatar
            username
        }
        Messages {
            payload
            seen
        }
    }
}</code></pre>

Realtime에 특화된 언어: erlang, elixir...

http: request를 보내면 request에 대한 응답을 받고 죽음
Websocket: connection을 열고, connection을 유지하고, 실시간으로 모든 걸 주고 받을 수 있음, Websocket은 request가 없음

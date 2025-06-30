import asyncio
import websockets
import json

# Địa chỉ WebSocket server (sửa lại nếu IP khác)
SERVER_URL = "ws://localhost:3006/joystick?userId=u1"

async def listen_to_commands():
    print(f"🔌 Kết nối tới WebSocket server tại {SERVER_URL}...")
    try:
        async with websockets.connect(SERVER_URL) as websocket:
            print("✅ Đã kết nối tới server WebSocket")

            while True:
                try:
                    message = await websocket.recv()
                    print("📥 Nhận lệnh:", message)

                    try:
                        data = json.loads(message)
                        handle_command(data)
                    except json.JSONDecodeError:
                        print("❌ Lỗi: Không parse được JSON:", message)

                except websockets.ConnectionClosed:
                    print("❌ Kết nối bị đóng từ phía server.")
                    break

    except Exception as e:
        print("❌ Lỗi khi kết nối tới server:", e)


def handle_command(data):
    """
    Xử lý dữ liệu joystick nhận được
    """
    user_id = data.get("userId")
    device_id = data.get("deviceId")
    vx = data.get("vx", 0)
    vy = data.get("vy", 0)
    w = data.get("w", 0)

    print(f"🤖 Xử lý lệnh từ user={user_id}, thiết bị={device_id}: vx={vx}, vy={vy}, w={w}")
    # TODO: Gửi lệnh tới động cơ ở đây nếu dùng thật


if __name__ == "__main__":
    asyncio.run(listen_to_commands())

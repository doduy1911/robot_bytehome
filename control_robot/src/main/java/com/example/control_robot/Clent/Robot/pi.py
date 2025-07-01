import websocket
import json

def on_message(ws, message):
    try:
        data = json.loads(message)
        user_id = data.get("userId")
        device_id = data.get("deviceId")
        vx = data.get("vx")
        vy = data.get("vy")
        w = data.get("w")

        print("🔧 Đã nhận lệnh điều khiển:")
        print(f"  🧑 userId   : {user_id}")
        print(f"  🤖 deviceId : {device_id}")
        print(f"  ➡️ vx       : {vx}")
        print(f"  ⬆️ vy       : {vy}")
        print(f"  🔁 w        : {w}")
        print("-" * 30)
    except json.JSONDecodeError:
        print("❌ Không đọc được JSON:", message)

def on_open(ws):
    print("✅ Pi đã kết nối WebSocket")

websocket.enableTrace(True)
ws = websocket.WebSocketApp("ws://localhost:3006/joystick?userId=u1",
                            on_open=on_open,
                            on_message=on_message)
ws.run_forever()

package com.example.control_robot.Controller;

import com.example.control_robot.DTO.JoystickCommandDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JoystickWebsocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = getUserIdFromQuery(session);
        sessions.put(userId, session);
        System.out.println("✅ WebSocket đã kết nối: userId = " + userId);
    }

    public void sendJsonToClient(String userId, JoystickCommandDTO dto) {
        WebSocketSession session = sessions.get(userId);
        if (session != null && session.isOpen()) {
            try {
                String json = mapper.writeValueAsString(dto);
                session.sendMessage(new TextMessage(json));
                System.out.println("📤 Đã gửi lệnh xuống Pi (userId = " + userId + "): " + json);
            } catch (IOException e) {
                System.err.println("❌ Lỗi khi gửi WebSocket tới Pi: " + e.getMessage());
            }
        } else {
            System.err.println("⚠️ Không có session mở với Pi (userId = " + userId + ")");
        }
    }


    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String json = message.getPayload();

        try {
            JoystickCommandDTO cmd = mapper.readValue(json, JoystickCommandDTO.class);
//            System.out.printf("📥 Nhận lệnh joystick từ user %s → robot %s | vx=%.3f, vy=%.3f, w=%.3f%n",
//                    cmd.getUserId(), cmd.getDeviceId(), cmd.getVx(), cmd.getVy(), cmd.getW());

            // 👉 Gửi xuống Raspberry Pi (giả sử userId là "pi1")
            String piUserId = "u1"; // hoặc tra từ deviceId → PiId
            sendJsonToClient(piUserId, cmd);

        } catch (Exception e) {
            System.err.println("❌ Lỗi parse JSON: " + e.getMessage());
            System.err.println("Dữ liệu lỗi: " + json);
        }
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String userId = getUserIdFromQuery(session);
        sessions.remove(userId);
        System.out.println("❌ WebSocket ngắt kết nối: userId = " + userId);
    }

    private String getUserIdFromQuery(WebSocketSession session) {
        String query = session.getUri().getQuery(); // ví dụ: "userId=u1"
        if (query != null && query.startsWith("userId=")) {
            return query.substring("userId=".length());
        }
        return "unknown";
    }

    // ✅ Gửi dữ liệu từ server xuống client WebSocket
    public void sendToClient(String userId, JoystickCommandDTO command) {
        WebSocketSession session = sessions.get(userId);
        if (session != null && session.isOpen()) {
            try {
                String json = mapper.writeValueAsString(command);
                session.sendMessage(new TextMessage(json));
                System.out.println("📤 Đã gửi dữ liệu xuống client userId=" + userId + ": " + json);
            } catch (IOException e) {
                System.err.println("❌ Lỗi khi gửi dữ liệu WebSocket: " + e.getMessage());
            }
        } else {
            System.err.println("⚠️ Không tìm thấy session đang mở cho userId=" + userId);
        }
    }
}

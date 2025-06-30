package com.example.control_robot.Controller;

import com.example.control_robot.DTO.JoystickCommandDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JoystickWebsocketHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        System.out.println("✅ WebSocket mới đã kết nối: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String json = message.getPayload();
        try {
            JoystickCommandDTO command = mapper.readValue(json, JoystickCommandDTO.class);
            System.out.printf("📥 Nhận lệnh từ user=%s → device=%s\n", command.getUserId(), command.getDeviceId());

            // 🔁 Gửi broadcast tới toàn bộ client (bao gồm Pi)
            broadcastToAll(command);

        } catch (Exception e) {
            System.err.println("❌ Lỗi parse JSON: " + e.getMessage());
            System.err.println("Dữ liệu: " + json);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        System.out.println("❌ WebSocket đã ngắt kết nối: " + session.getId());
    }

    private void broadcastToAll(JoystickCommandDTO dto) {
        try {
            String json = mapper.writeValueAsString(dto);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(json));
                    System.out.println("📤 Gửi tới session " + session.getId() + ": " + json);
                }
            }
        } catch (IOException e) {
            System.err.println("❌ Lỗi khi broadcast WebSocket: " + e.getMessage());
        }
    }
}

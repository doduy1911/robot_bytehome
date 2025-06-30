package com.example.control_robot.Config;

import com.example.control_robot.Controller.JoystickWebsocketHandler;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebSocketConfigurer {

    private final JoystickWebsocketHandler joystickWebsocketHandler;

    public WebsocketConfig(JoystickWebsocketHandler joystickWebsocketHandler) {
        this.joystickWebsocketHandler = joystickWebsocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(joystickWebsocketHandler, "/joystick")
                .setAllowedOrigins("*"); // hoặc cấu hình cụ thể tùy theo frontend
    }
}

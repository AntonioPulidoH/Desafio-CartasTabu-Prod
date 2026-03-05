import { Module } from "@nestjs/common";
import { WebsocketsGateway } from "./websocket.gateaway";

@Module({
  providers: [WebsocketsGateway],
  exports: [WebsocketsGateway], 
})
export class WebsocketsModule {}
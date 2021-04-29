import "reflect-metadata";
import appConfig from "./config";
import server from "./server";

server.listen(appConfig.PORT, "localhost", () => {
    console.info(`Server running on http://localhost:${appConfig.PORT}`);
});

import { App } from './app';
import { connectDB } from './dataBase';
import config from './config/config';

const app = new App();
void connectDB();
app.getApp().listen(config.port, () => {
	console.log('Server port ', config.port);
});

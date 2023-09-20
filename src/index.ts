import { App } from './app';
import { connectDB } from './dataBase';
import config from './config/config';

const app = new App();
void connectDB();
app.getApp().listen(config.PORT, () => {
	console.log('Server port ', config.PORT);
});

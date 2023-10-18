import { App } from './app';
import { connectDB } from './dataBase';
import {Config} from './config/config';

const app = new App();
const config = new Config;
void connectDB();
app.getApp().listen(config.getPORT(), () => {
	// eslint-disable-next-line no-console
	console.log('Server port ', config.getPORT());
});

import { config } from 'dotenv';
import App from 'src/app';
import usersRouter from 'src/routes/users-router';

config();
const { PORT = 5000 } = process.env;
const app = new App();

app.addRouter(usersRouter);
app.listen(+PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));
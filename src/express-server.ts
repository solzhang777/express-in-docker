import Express, { Request, Response } from 'express';
import path from 'path';
import log4js, { Logger } from 'log4js';
import log4jsextend from 'log4js-extend';
import DemoController from './controller/demo.controller';
import CourseController from './controller/course.controller';
import UploadImageController from './controller/upload-image.controller';
import GerritAuthController from './controller/gerrit.controller';

log4js.configure({
    appenders: {
        logfiles: { type: 'file', filename: 'server.log' },
        consoles: { type: 'console' }
    },
    categories: { default: { appenders: ['logfiles', 'consoles'], level: 'debug' } }
});

log4jsextend(log4js, {
    path: __dirname,
    format: "at @name (@file:@line:@column)"
});

class App {

    private static logger: Logger = log4js.getLogger('App');

    private app: Express.Express;
    private port: number = 3000;

    constructor() {
        this.app = Express();
    }
    public run(): void {
        // new AppRouter(this.app);
        // this.app.use(KoaStatic(path.join(__dirname, '../../web/dist')));
        this.app.use('/', Express.static(path.join(__dirname, '../../web/dist')));

        const imagesPath = path.join(__dirname, '../images');
        this.app.use('/images', Express.static(imagesPath));

        this.app.listen(this.port);
        App.logger.info(`服务器启动, 端口[${this.port}]`);


        this.app.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", ' 3.2.1')
            res.header("Content-Type", "application/json;charset=utf-8");
            next();
        });

        // 注册controller
        new DemoController(this.app);
        new CourseController(this.app);
        new UploadImageController(this.app);
        new GerritAuthController(this.app);
    }
}

new App().run();

import { Express, Request, Response } from 'express';
import log4js, { Logger } from 'log4js';
import { IncomingForm, Fields, Files } from "formidable";
import path from "path"

export default class UploadImageController {

    private static logger: Logger = log4js.getLogger('UploadImageController');

    constructor(private express: Express) {
        this.dispatch();
        UploadImageController.logger.debug("控制器 UploadImageController 初始化完毕");
    }

    private dispatch(): void {
        this.express.post('/upload', (req: Request, res: Response) => { this.upload(req, res); });
    }

    private upload(req: Request, res: Response): void {
        const form: IncomingForm = new IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = path.join(__dirname, '../../images')
        form.parse(req, (err: any, fields: Fields, files: Files): any => {
            if(err){
                res.status(500).send(`update failure with : ${err}`);
                return ;
            }
            const filepath = files.file.path.replace(form.uploadDir+"\\", '');
            res.status(200).send(filepath);
        });

    }

};

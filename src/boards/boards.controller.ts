import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    //ts는 원래는 boardsService: BoardsService 를 상단에 정의해야 프로퍼티(ex. this.boardsService)를
    //사용할 수 있는데 생성자 파라미터에 접근제한자를 붙이면 그 파라미터는 자동으로 해당 클래스의
    //프로퍼티로 선언된다. 그래서 아래 생성자 안에 private boardsService로 쓴 것.
    constructor(private boardsService: BoardsService) {
        //private boardsService: BoardsService => 생성자 안에서 DI 해주는 것.
        //Service를 controller 에서 사용하려면 이렇게 DI를 해줘야 갖다 쓸 수 있다.
    }
    //controller에서 request method를 받을 때는 http method와 동일한 데코레이터를 사용
    // controller에 요청이 들어오면 -> service에서 처리(=request를 handle)하여 값을 controller로 return
    //  -> controller에서 값을 클라이언트에 보냄
    @Get('/')
    getAllBoards() {
        return this.boardsService.getAllBoards();
    }
}

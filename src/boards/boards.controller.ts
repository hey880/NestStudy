import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model';
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
    getAllBoards(): Board[] {//boardsService의 getAllBoards의 return 타입이 Board[]이므로 똑같이 Board[] 타입을 사용.
        return this.boardsService.getAllBoards();
    }
    //위 내용 다음에 CRUD 중 C를 만들기 전에 model을 정의해주면 좋음
    //model은 ~.model.ts 파일로 정의 => boards 폴더에 board.model.ts 파일 생성

    //create board service를 가져오자
    @Post() 
    createBoard(
        @Body('title') title: string,
        @Body('description') description: string 
    ):Board {
        //@Body() body는 request body(사용자가 request로 보내온 값)를 가져오는 역할
        //만약 body중 특정 값만 가져오고 싶다면 @Body('title') title
        //같은 형식으로 기재하면 된다.
        //이 기능은 포스트맨으로 테스트 할 수 있다.
        return this.boardsService.createBoard(title, description);
    }
}


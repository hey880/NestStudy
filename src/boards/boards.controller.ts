import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    /*
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
    @UsePipes(ValidationPipe)
    //UsePipes - 핸들러 레벨의 파이프, ValidationPipe - 유효성 체크하는 빌트인 파이프 
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ):Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    //id 라는 Param을 가져옴.
    //쿼리스트링에 값 여러개라서 Param을 여러개 가져올 때는 @Param() params: string[]
    //이렇게 괄호 안에 아무것도 안 써주는 방식으로 사용
    @Get('/:id')
    getBoardById(@Param('id') id:string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoard(
        @Param('id') id: string,
        //status값만 유효성 체크하면 돼서 아래에 BoardStatusValidationPipe는
        //status 파라미터에 대해, 파라미터 레벨에서 사용
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Board {
        return this.boardsService.updateBoardStatus(id, status);
    }
    */
}


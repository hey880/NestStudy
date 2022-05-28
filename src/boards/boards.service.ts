import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { filter } from 'rxjs';

@Injectable()//다른 컴포넌트에서 사용 가능하게 만듦
export class BoardsService {
    //private을 안 쓰면 다른 컴포넌트에서 boards 배열을 수정할 수 있어서
    //private으로 지정.
    private boards: Board[] = [];

    getAllBoards(): Board[] {//이 함수는 boards controller에서 사용
        return this.boards; //위 배열에 있는 모든 값을 가져옴.
    }

    //게시물에 관한 로직을 처리하는 곳은 Service -> 로직 처리 후 Controller에서
    //Service를 불러온다.
    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            //id는 필수이고 유니크 값인데 지금 db를 쓰는 게 아니라서 
            //uuid 모듈을 이용해서 유니크 값으로 만들어줌. npm i uuid --save
            //title: title,
            //description: description, 파라미터와 프로퍼티의 이름이 같으면 
            //위처럼 파라미터를 프로퍼티의 값으로 넣지 않고 그냥 써줘도 자동으로 파라미터값을
            //가져다 쓰게 된다.
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC //public을 default로 둠
        }
        //이렇게 게시판을 생성하면 boards 배열에 생성된 board를 넣어줘야 한다.
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {//지우는 건 그냥 지우는 거니까 return 안함
        this.boards = this.boards.filter((board) => board.id !==id );
    }
}


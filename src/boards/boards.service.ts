import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()//다른 컴포넌트에서 사용 가능하게 만듦
export class BoardsService {
    constructor(
        //service를 DI 했던 것과는 다르게 Repository를 DI 할 때는 
        //InjectRepository 데코레이터를 사용한다.
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    // getAllBoards(): Board[] {//이 함수는 boards controller에서 사용
    //     return this.boards; //위 배열에 있는 모든 값을 가져옴.
    // }

    // //게시물에 관한 로직을 처리하는 곳은 Service -> 로직 처리 후 Controller에서
    // //Service를 불러온다.
    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         //id는 필수이고 유니크 값인데 지금 db를 쓰는 게 아니라서 
    //         //uuid 모듈을 이용해서 유니크 값으로 만들어줌. npm i uuid --save
    //         //title: title,
    //         //description: description, 파라미터와 프로퍼티의 이름이 같으면 
    //         //위처럼 파라미터를 프로퍼티의 값으로 넣지 않고 그냥 써줘도 자동으로 파라미터값을
    //         //가져다 쓰게 된다.
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC //public을 default로 둠
    //     }
    //     //이렇게 게시판을 생성하면 boards 배열에 생성된 board를 넣어줘야 한다.
    //     this.boards.push(board);
    //     return board;
    // }
    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise <Board> {
        //typeorm의 findOne 메서드를 사용 => id랑 매칭되는 첫번째 entity를 찾아주는 메서드
        const found = await this.boardRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }
    
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //         //없는 상품을 찾으려고 할 경우 not found 예외 발생
    //     }

    //     return found;
    // }
    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        //없는 id를 지우려고 하면 에러는 따로 발생 안되고 result의 affected가 0으로 나오니까
        //에러를 만들어주자.
        if(result.affected == 0) {
            throw new NotFoundException(`Can't find board with id ${id}`)
        }
    }
    // deleteBoard(id: string): void {//지우는 건 그냥 지우는 거니까 return 안함
    //     const found = this.getBoardById(id); // => getBoardById에 예외처리 되어있음
    //     this.boards = this.boards.filter((board) => board.id !== found.id );
    // }

    // updateBoardStatus(id: string, status: BoardStatus) : Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}


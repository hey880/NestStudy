import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()//다른 컴포넌트에서 사용 가능하게 만듦
export class BoardsService {
    //private을 안 쓰면 다른 컴포넌트에서 boards 배열을 수정할 수 있어서
    //private으로 지정.
    private boards: Board[] = [];

    getAllBoards(): Board[] {//이 함수는 boards controller에서 사용
        return this.boards; //위 배열에 있는 모든 값을 가져옴.
    }
}

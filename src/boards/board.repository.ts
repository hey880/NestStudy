import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
//Repository는 db 관련 처리를 하는 저장소 공간
//이 repository를 다른 곳에서도 사용할 수 있도록 하기 위해서
//injectable 모듈인 board.module에서 import 해준다.
//forRoot와 forFeature의 차이 https://www.inflearn.com/questions/299631
@EntityRepository(Board) //현재 typeorm 0.3 이상에서는 EntityRepository가
//deprecated 상태임. 공식문서에는 typeorm 0.2를 사용하여 0.2 사용을 권장.
export class BoardRepository extends Repository<Board> {
//Typeorm은 Repository 패턴을 사용.
//Repository에서 DB를 처리하기 위해서는 Service에서 이 Repository를 DI해줘야 한다.

//DB 처리된 부분은 Repository에 써줘야함.
//Service에 메서드를 정의하고 Controller에서 갖다 쓰는 것처럼 Repository에 메서드를 정의하고 
//service에서 갖다가 씀.
    async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({ //create: 객체를 만드는 메서드
            //여기서 this는 BoardRepository를 의미.
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board); //save: 객체를 DB에 저장하는 메서드

        return board;
    }
}

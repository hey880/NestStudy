import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
//Repository는 db 관련 처리를 하는 저장소 공간
//이 repository를 다른 곳에서도 사용할 수 있도록 하기 위해서
//injectable 모듈인 board.module에서 import 해준다.
//forRoot와 forFeature의 차이 https://www.inflearn.com/questions/299631
@EntityRepository(Board) //현재 typeorm 0.3 이상에서는 EntityRepository가
//deprecated 상태임. 공식문서에는 typeorm 0.2를 사용하여 0.2 사용을 권장.
export class BoardRepository extends Repository<Board> {

}

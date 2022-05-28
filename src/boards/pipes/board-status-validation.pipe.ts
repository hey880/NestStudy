import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";
// 모든 pipe는 (아래는 custom pipe임) PipeTransform 인터페이스가 있어야 함.
// transform(value, metadata) 메서드를 구현해야 함
// 실제 요청을 받는 핸들러에 이 파이프를 넣어줘야 함. controller쪽에.
// 이 프로젝트에서는 updateBoardStatus를 할 때 status를 바꿔주니까
// 이때 유효성 체크를 해줘야하므로 이 파이프를 사용한다.
export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        //status에 이상한 값을 넣지 못하도록 validation 하는 역할
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any) { // 파라미터에 metadata는 안 써서 지움
        value = value.toUpperCase(); // status를 PRIVATE, PUBLIC 이렇게 대문자로
        //정의해둬서 value를 대문자로 보낼 수 있도록 함.

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1; // indexOf는 배열에 없는 값을 찾으면
        //index를 -1로 반환함.
    }
}
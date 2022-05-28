import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
// 모든 pipe는 (아래는 custom pipe임) PipeTransform 인터페이스가 있어야 함.
// transform(value, metadata) 메서드를 구현해야 함
// 실제 요청을 받는 핸들러에 이 파이프를 넣어줘야 함. controller쪽에.
// 이 프로젝트에서는 updateBoardStatus를 할 때 status를 바꿔주니까
// 이때 유효성 체크를 해줘야하므로 이 파이프를 사용한다.
export class BoardStatusValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value', value);
        console.log('metadata', metadata);

        return value;
    }
}
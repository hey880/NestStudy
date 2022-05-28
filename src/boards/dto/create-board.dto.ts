import { IsNotEmpty } from "class-validator";
//클래스는 인터페이스와 다르게 런타임에서 작동하여
//파이프 같은 기능을 이용할 때 더 유용함.
//그래서 클래스를 이용해서 DTO를 작성하려 함.
export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
//위처럼 만들어진 DTO는 Controller와 Service에서 적용
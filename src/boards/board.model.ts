//모델 정의는 Class나 Interface를 이용하면 된다.
// interface: 변수의 타입만을 체크
// class : 변수의 타입도 체크하고 인스턴스 또한 생성할 수 있다.

//우선은 board의 구조만(=변수의 타입만) 정의하기 위해 interface 사용
//특정 타입만 오도록 하기 위한 ts 기능은 enumeration(=enum)
//선언한 enum을 타입으로 두면 해당 enum에 없는 타입이 들어올 경우 에러가 발생한다.
export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus;
} //이렇게 정의된 모델 구조는 controller, service에서 타입으로 쓰인다.

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}


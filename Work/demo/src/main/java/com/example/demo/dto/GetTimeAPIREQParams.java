package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class GetTimeAPIREQParams { // 요청받은 parameter 정의
    String timezone;
}

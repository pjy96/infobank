package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.StompMessage;
import com.example.demo.dto.DeleteDTO;
import com.example.demo.dto.GetTimeAPIREQParams;
import com.example.demo.dto.GetTimeAPIRESParams;
import com.example.demo.dto.IpEmailCountRESDTO;
import com.example.demo.dto.RegexDTO;
import com.example.demo.service.Utils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
// import lombok.extern.java.Log;
import lombok.extern.java.Log;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Log
@Controller
@Component
public class controller{

    @Autowired
    Utils utils;

    // Hello World example
    @GetMapping("/hello")
    @ResponseBody
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name){
        return String.format("hello %s!!", name); 
    }

    // index.html 호출
    @RequestMapping(value = "/")
    public String index(HttpSession session, HttpServletRequest request) {
        log.info("[Index HTML Call] | " + session.getId()); // getId
        if (session.getAttribute("regArray") == null){ // regArray에 바인딩 된 객체를 돌려주고, 없다면 null
            ArrayList<String> regArray = new ArrayList<String>(); // browser마다 다른 배열에 저장 
            session.setAttribute("regArray", regArray); // 객체 생성
        }
        return "index.html"; 
    }

    // worldtimeapi
    @GetMapping("/api/getTime")
    @ResponseBody
    public GetTimeAPIRESParams getTime(GetTimeAPIREQParams params){
        String getTimeZone = params.getTimezone();
        if(getTimeZone == null){ // default Asia/Seoul
            getTimeZone="Asia/Seoul";
        }
        return utils.getTimeWithZone(getTimeZone); // service 호출
    }

    // 정규식 validation 하는 API & repository에 저장
    @RequestMapping(value = "/api/reg", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public RegexDTO TestIPEmail(@RequestParam String params, HttpServletRequest req){ // 
        Object obj = req.getSession().getAttribute("regArray"); // regArray
        List<String> arrList = (List<String>)obj; // List<object> to List<String> 형변환
        return utils.getVaildation(params, arrList, req);
    }

    // 삭제 API
    @RequestMapping(value = "/api/del", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public DeleteDTO DeleteArray(@RequestParam int idx, HttpSession session) {
        Object obj = session.getAttribute("regArray"); // regArray
        List<String> arrList = (List<String>)obj; // List<object> to List<String> 형변환
        return utils.deleteArray(idx, arrList);
    }

    // today ip, email schedule로 5초마다 주기적으로 실행
    @RequestMapping(value = "/api/count", method = {RequestMethod.GET, RequestMethod.POST})
    @Scheduled(fixedRate = 5000) // 작업 시작 시점 기준
    @ResponseBody
    public IpEmailCountRESDTO scheduledTask(){
        IpEmailCountRESDTO ieDto = utils.count();
        // log.info("스케줄러 테스트");
        return ieDto;
    }

    // Websocket으로 today ip, email 주기적으로 메세지 전송
    @MessageMapping("/sendmessage")
    public StompMessage send(StompMessage stm) throws Exception {
        return new StompMessage();
    }

}
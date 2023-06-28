const res = require("./fetch");


async function common_questions() {
  let response_handle1 = await res.user_status_handle1();
  let response_handle2 = await res.user_status_handle2();

  let result_handle1 = response_handle1["result"];
  let result_handle2 = response_handle2["result"];
  let mp_for_handle1_tried=new Map();
  let mp_for_handle1_solved= new Map();
//   console.log(result_handle1);

  for(let i in result_handle1){
    
    let contestidindex = result_handle1[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result_handle1[i]["problem"]["index"];

    let ifOK = result_handle1[i]["verdict"];
    if (ifOK == "OK") {
      mp_for_handle1_solved.set(contestidindex,1);
    }
    mp_for_handle1_tried.set(contestidindex, 1);
  }
  
  let common_tried=0;
  let common_solved=0
  for(let i in result_handle2){
    let contestidindex = result_handle2[i]["problem"]["contestId"];
    contestidindex += "-";
    contestidindex += result_handle2[i]["problem"]["index"];
    let ifOK = result_handle2[i]["verdict"];
    if ( ifOK=="OK" && mp_for_handle1_solved.has(contestidindex)) {
      if(mp_for_handle1_solved.get(contestidindex)!=-1){
      common_solved++;
      mp_for_handle1_solved.set(contestidindex,-1);
      }
    }
    if (  mp_for_handle1_tried.has(contestidindex)) {
        if(mp_for_handle1_tried.get(contestidindex)!=-1){
        common_tried++;
        mp_for_handle1_tried.set(contestidindex,-1);
        }
      }
  }
  
  let common_questions={
    "common solved":common_solved,
    "common tried":common_tried
  };
  console.log(common_questions)

//   let contest_details_handle1 = max_current_rating(result_handle1);
//   let contest_details_handle2 = max_current_rating(result_handle2);

//   let compare_handles = {
//     handle1: contest_details_handle1,
//     handle2: contest_details_handle2,
//   };

//   console.log(compare_handles);
}
common_questions();

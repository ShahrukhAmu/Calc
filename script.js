window.onload = function(){

    var buttons = document.getElementsByClassName('button');
    var exp = document.getElementById('exp');
    var ac = document.getElementById('clear');
    var result = document.getElementById('result');
    var nhits = 0; // to count no of times a bracket is pressed;
    var prev_ans= "No";
    var eqal_hit = 0;
    var pre_eval = 0;

    ac.addEventListener('click',()=>{
        exp.innerHTML = 0;
        exp.style.fontSize = "27px";
        prev_ans = "No";
        document.getElementById('result').innerText = "= Result";
        document.getElementById('result').style.fontSize="16px"

    });


    var eq = document.getElementById('equal');
    eq.addEventListener('click',()=>{
        
        console.log(eqal_hit);
        if(eqal_hit<2 && prev_ans=="No"){
            eqal_hit++;
            if(result.innerText!="= Result"){
                result.style.fontSize = "27px";
                exp.style.fontSize = "16px";
                
                if(result.innerText!="Syntax Error")
                    prev_ans = result.innerText.substring(1,result.innerHTML.length);    
                    // exp.innerText = result.innerText.substring(1,result.innerText.length);
                
            }
        }
        else if(prev_ans!="No"){
            
            exp.innerText = prev_ans;
            // result.innerText = "= Result";
            nhits=0;
            }
    
    });

    for(let i=0; i<buttons.length;i++){
        
        buttons[i].addEventListener('click',function(event){
            
            if(event.target.innerText !="AC" && event.target.innerText !="⌫" && event.target.innerText !="="&& event.target.innerText!="( )"){
                    eqal_hit =0;
                    prev_ans = "No";
                    exp.style.fontSize = "27px";
                    result.style.fontSize="16px";


                    if(exp.innerText.length ==1 && exp.innerText.charAt(0)=="0" && event.target.innerText != "%" && event.target.innerText != "x" && event.target.innerText != "÷")
                        exp.innerText='';
        
                    // if(prev_ans!="No" && exp.innerText.charAt(0)!=0 )
                    //     exp.innerText = prev_ans;                  

                    exp.innerText+=event.target.innerText;
                    exp.innerText = (exp.innerText.replace('x','*')).replace('÷','/');
                    console.log(exp.innerText);

                    try{
                        
                        setTimeout(()=>{
                            result.innerHTML = "= "+ parse((exp.innerText.replace('x','*')).replace('÷','/'));

                        },2);
                    }
                    catch(error){
                        if (error instanceof SyntaxError)
                        result.innerText = "SyntaxError";
                
                }
            }

                    
            if(event.target.innerText=="( )"){
                if(nhits%2==0){
                    exp.innerText+=event.target.innerText.charAt(0);
                    exp.innerText = (exp.innerText.replace('x','*')).replace('÷','/')

                    console.log(exp.innerText);
                    nhits++;
                }
                else {
                    exp.innerText+=event.target.innerText.charAt(2);
                    exp.innerText = (exp.innerText.replace('x','*')).replace('÷','/')
                    console.log(exp.innerText);
                    nhits++;
                }
                result.innerText = "= "+ parse(exp.innerText);

            }

            if(event.target.innerText=="⌫"){
                exp.style.fontSize = "27px";
                result.style.fontSize ="16px";
        
                if(exp.innerText.length<=1)
                    exp.innerText = "0";
        
                if(exp.innerText!=0){
                    console.log("to delete! is:" );
                    console.log(exp.innerText.charAt(exp.innerText.length-1));
                    if(exp.innerText.charAt(exp.innerText.length-1) == '(' || exp.innerText.charAt(exp.innerText.length-1) == ')'){
        
                        nhits-=1;
                        console.log("after deleting "+nhits);
                    } 
        
                    exp.innerText = exp.innerText.substring(0,exp.innerText.length-1);  
                    exp.innerText.replace('x','*').replace('÷','/');
                    
                    try{
                        result.innerHTML = "= "+ parse(Exp);
                    }
                    catch(error){
                        if (error instanceof SyntaxError)
                        result.innerText = "SyntaxError";                    
                    }
             
                }
            }
        });
    }
    
    // split expression by operator considering parentheses
    // eval expression.
		const split = (expression, operator) => {
			const result = [];
			let braces = 0;
			let currentChunk = "";
			for (let i = 0; i < expression.length; ++i) {
				const cur = expression[i];
				if (cur == '(') {
					braces++;
				} else if (cur == ')') {
					braces--;
				}
				if (braces == 0 && operator == cur) {
					result.push(currentChunk);
					currentChunk = "";
				} else currentChunk += cur;
			}
			if (currentChunk != "") {
				result.push(currentChunk);
			}
			return result;
		};
		
        const parse = (expr) => {
			const expression = expr;
            const result = eval(String(expression));
            return String(result);
		};

};


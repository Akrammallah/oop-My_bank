import inquirer from "inquirer";
import chalk from "chalk";

interface BankAccount {
  accountNum: number;
  balance: number;
withdraw(amount:number):void  
deposit(amount:number):void  
checkBlance():void  
};

class bankAccount implements BankAccount {
  accountNum: number;
  balance: number;
 constructor(accNum:number,balance:number){
  this.accountNum = accNum,
  this.balance = balance
 }
 // debit money
withdraw(amount: number): void {
  if(this.balance >= amount){
    this.balance -= amount;
    console.log(chalk.greenBright(`withdrawal of $${amount} succesful your remaining balance is $${this.balance}`));
    }else{
      console.log("insufficient balance");
      
    }
}
// credit money
deposit(amount: number): void {
  if(amount > 100){
    amount -= 1;
    this.balance += amount;
    console.log(chalk.blue(`Deposit of $${amount} succesful remaining balance is $${this.balance}`));
    
  }else if(amount <= 99){
    this.balance += amount;
    console.log(`your current balance is $${this.balance}`);
    
  }
}
checkBlance(): void {
  console.log(chalk.red(`your current balance is $${this.balance}`));
  
}
}

class Custmor {
  firstName: string;
  lastName: string;
  gender: string;
  mobNum:number;
  account:bankAccount
  constructor(fname:string,lName:string,gender:string,mobNum:number,acc:bankAccount){
    this.firstName = fname;
    this.lastName = lName;
    this.gender = gender;
    this.mobNum =mobNum;
    this.account = acc
  }

}
 
 const accounts:bankAccount[] = [
new bankAccount(1001,500),
new bankAccount(1002,1000),
new bankAccount(1003,2000),

 ]
const custmors:Custmor[] = [
  new Custmor("Muhammad","Akram","male",3084949612,accounts[0],),
  new Custmor("Muhammad","Aslam","male",3007027233,accounts[1],),
  new Custmor("Ali","Jan","male",3204949612,accounts[2],)
]

async function bankService() {
  do {
    let service = await inquirer.prompt({
      name: "acc",
      type:"number",
      message:"Please enter your valid account number"
    });
    let custmor = accounts.find(val => val.accountNum === service.acc) 
    if(custmor){
    console.log(chalk.yellow("Welcome dear custmor ..have a good day"));
      
      let ans = await inquirer.prompt([{
        name:"select",
        type:"list",
        message:"Enter your option",
        choices: ["Deposit","Withdraw","checkBlance","Exit"]
      }]);
      switch (ans.select){
  case "Deposit":
      let cashDeposit = await inquirer.prompt({
        name:"amount",
        type:"number",
        message: "Enter your cash deposit amount"
      });
      custmor.deposit(cashDeposit.amount);
      break;
  case "Withdraw":
    let cashWithdraw = await inquirer.prompt({
      name:"amount",
      type:"number",
      message: "Enter your cash withdraw amount"
    });
    custmor.withdraw(cashWithdraw.amount);
    break; 
case "checkBlance":
    console.log(chalk.green(`your remaining balance $${custmor.balance}`));
    break;
case "Exit":
  console.log(chalk.red("Exiting from account"));
  console.log(chalk.blueBright("Thank you for using our bank service"));
  return;    
    
      }
  
    
    }
  } while (true);
}
bankService();
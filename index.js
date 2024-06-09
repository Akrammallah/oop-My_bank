import inquirer from "inquirer";
import chalk from "chalk";
;
class bankAccount {
    accountNum;
    balance;
    constructor(accNum, balance) {
        this.accountNum = accNum,
            this.balance = balance;
    }
    // debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.greenBright(`withdrawal of $${amount} succesful your remaining balance is $${this.balance}`));
        }
        else {
            console.log("insufficient balance");
        }
    }
    // credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
            this.balance += amount;
            console.log(chalk.blue(`Deposit of $${amount} succesful remaining balance is $${this.balance}`));
        }
        else if (amount <= 99) {
            this.balance += amount;
            console.log(`your current balance is $${this.balance}`);
        }
    }
    checkBlance() {
        console.log(chalk.red(`your current balance is $${this.balance}`));
    }
}
class Custmor {
    firstName;
    lastName;
    gender;
    mobNum;
    account;
    constructor(fname, lName, gender, mobNum, acc) {
        this.firstName = fname;
        this.lastName = lName;
        this.gender = gender;
        this.mobNum = mobNum;
        this.account = acc;
    }
}
const accounts = [
    new bankAccount(1001, 500),
    new bankAccount(1002, 1000),
    new bankAccount(1003, 2000),
];
const custmors = [
    new Custmor("Muhammad", "Akram", "male", 3084949612, accounts[0]),
    new Custmor("Muhammad", "Aslam", "male", 3007027233, accounts[1]),
    new Custmor("Ali", "Jan", "male", 3204949612, accounts[2])
];
async function bankService() {
    do {
        let service = await inquirer.prompt({
            name: "acc",
            type: "number",
            message: "Please enter your valid account number"
        });
        let custmor = accounts.find(val => val.accountNum === service.acc);
        if (custmor) {
            console.log(chalk.yellow("Welcome dear custmor ..have a good day"));
            let ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Enter your option",
                    choices: ["Deposit", "Withdraw", "checkBlance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    let cashDeposit = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter your cash deposit amount"
                    });
                    custmor.deposit(cashDeposit.amount);
                    break;
                case "Withdraw":
                    let cashWithdraw = await inquirer.prompt({
                        name: "amount",
                        type: "number",
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

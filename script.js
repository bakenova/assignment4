$(function() {

    b_education = document.getElementById("education");
    b_net = document.getElementById("networth");
    b_skills = document.getElementsByName("skill");
    b_age = document.getElementsByName("age");
    b_reput = document.getElementsByName("reputation");

    submit = document.getElementById("submit");

    let calculate = () => {
        let name = document.getElementById("bname").value;
        let price = Number(document.getElementById("bid").value);
        let loveLetter = document.getElementById("letter").value;

        if (name.length == 0 && price.length == 0) {
            alert('Please, fill out name and bid');
        }

        values = ["1.5", "1.2", "1.05", "0.9"];
        if (values.includes(b_education.value)) {
            price *= Number(b_education.value);
        }

        values = ["2", "1.5", "1.2"];
        if (values.includes(b_net.value)) {
            price *= Number(b_net.value);
        }

        price = getSkillsReduce(b_skills, price)
        price = getAgeValue(b_age, price)
        price = getReputationValuesForLoop(b_reput, price)

        document.getElementById("result").innerHTML = `The price for your bride (${name}) is $${price}. Your love letter is "${loveLetter}"`;
    };
    const getSkillsReduce = (html_collection, price) => {
        let list = Array.from(html_collection).filter(filteration)
        let result = list.reduce(reducer, price)
        return result;
    }
    const reducer = (accumulator, item) => {
        return accumulator + Number(item.value);
    }
    const filteration = (item) => {
        return item.checked;
    }
    const getAgeValue = (node_list, price) => {
        node_list.forEach(item => {
            if (item.checked) {
                price = price * Number(item.value)
            }
        })
        return price;
    }
    const getReputationValuesForLoop = (html_collection, price) => {
        for (let i = 0; i < html_collection.length; i++) {
            if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {
                price = price + Number(html_collection[i].value)
            } else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {
                price = price * Number(html_collection[i].value)
            }
        }
        return price;
    }
    submit.addEventListener('click', calculate);

});
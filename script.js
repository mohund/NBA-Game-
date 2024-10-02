const nbaTeams = {
    won: {
        "Boston Celtics": [
            1957, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1968, 1969, 1974,
            1976, 1981, 1984, 1986, 2008, 2024,
        ],
        "Los Angeles Lakers": [
            1949, 1950, 1952, 1953, 1954, 1972, 1980, 1982, 1985, 1987, 1988, 2000,
            2001, 2002, 2009, 2010, 2020,
        ],
        "Golden State Warriors": [1947, 1956, 1975, 2015, 2017, 2018, 2022],
        "Chicago Bulls": [1991, 1992, 1993, 1996, 1997, 1998],
        "San Antonio Spurs": [1999, 2003, 2005, 2007, 2014],
        "Philadelphia 76ers": [1955, 1967, 1983],
        "Detroit Pistons": [1989, 1990, 2004],
        "Miami Heat": [2006, 2012, 2013],
        "Milwaukee Bucks": [1971, 2021],
        "Houston Rockets": [1994, 1995],
        "New York Knicks": [1970, 1973],
        "Toronto Raptors": [2019],
        "Cleveland Cavaliers": [2016],
        "Dallas Mavericks": [2011],
        "Portland Trail Blazers": [1977],
        "Washington Wizards": [1978],
        "Seattle SuperSonics": [1979],
        "Atlanta Hawks": [1958],
        "Sacramento Kings": [1951],
        "Denver Nuggets": [2023],
    },
    neverWon: [
        "Phoenix Suns",
        "Utah Jazz",
        "Brooklyn Nets",
        "Orlando Magic",
        "Indiana Pacers",
        "Charlotte Hornets",
        "Minnesota Timberwolves",
        "Memphis Grizzlies",
        "New Orleans Pelicans",
        "Los Angeles Clippers",
        "Oklahoma City Thunder",
    ],
};

const teamInputElem = document.getElementById("teamInput");
const wonTableBody = document.getElementById("wonTableBody");
const neverWonTableBody = document.getElementById("neverWonTableBody");
let timer = document.getElementById("timer");
const button = document.getElementById("startButton");
let numberOfTeamsWon = 0;
let numberOfTeamsNotWon = 0;
const startmin = 3;
let time = startmin * 60;
teamInputElem.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        const team = teamInputElem.value;
        console.log(team);

        if (nbaTeams.won.hasOwnProperty(team)) {
            if (!isTeamAlreadyAdded(team, wonTableBody)) {
                addTeamRow(team, wonTableBody);
                numberOfTeamsWon++;
                console.log(numberOfTeamsWon);
            } else {
                alert(`${team} is already in the table!`);
            }
        } else if (nbaTeams.neverWon.includes(team)) {
            if (!isTeamAlreadyAdded(team, neverWonTableBody)) {
                addTeamRow(team, neverWonTableBody);
                numberOfTeamsNotWon++;
                console.log(numberOfTeamsNotWon);
            } else {
                alert(`${team} is already in the table!`);
            }
        }

        if (numberOfTeamsWon == 3 && numberOfTeamsNotWon == 3) {
            alert(
                `Game Over! You won! Your score is: ${numberOfTeamsWon + numberOfTeamsNotWon
                } \n` +
                `Number Of Teams That won: ${numberOfTeamsWon}\n` +
                `Number Of Teams That never won: ${numberOfTeamsNotWon}`
            );

            setTimeout(function () {
                location.reload();
            }, 5000);
        }
    }
});

function addTeamRow(team, tbodyElem) {
    const row = tbodyElem.insertRow();
    row.insertCell(0).innerText = team;

    if (nbaTeams.neverWon.indexOf(team) !== -1) {
        row.insertCell(1).innerText = "Never won";
    } else {
        row.insertCell(1).innerText = nbaTeams.won[team].join(", ");
    }
}

function isTeamAlreadyAdded(team, tbodyElem) {
    const rows = tbodyElem.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].innerText === team) {
            return true;
        }
    }
    return false;
}
function starttimer() {
    button.disabled = true;
    const countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        timer.innerHTML = `${minutes}:${seconds}`;

        if (time < 0) {
            clearInterval(countdownInterval);
            timer.innerHTML = "Time's up!";
            gameFunction();
            return;
        }

        time--;
    }

    function gameFunction() {
        alert(
            `Game Over! You lose! Your score is: ${numberOfTeamsWon + numberOfTeamsNotWon} \n` +
            `Number Of Teams That won: ${numberOfTeamsWon}\n` +
            `Number Of Teams That never won: ${numberOfTeamsNotWon}`
        );

        setTimeout(function () {
            location.reload();
        }, 5000);
    }
}

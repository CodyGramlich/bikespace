import Content from './content';
import questions from '../survey-questions';
import StateSession from '../state-session';

export default class Summary extends Content {
    constructor(survey) {
        super(...arguments);
        this.questions = questions;
    }

    get valid() {
        return this.values.length > 0;
    }

    get value() {
        return this.location;
    }

    bind(state) {
        var state = StateSession.getInstance().get();
        var questions = this.questions;
        var problems = state.problem_type.reduce((memo, value) => {
            memo += '<div class="options"><li><em>' + questions[0].questions[0].values.find(entry => entry.key === value).text + '</em></li></div>'
            return memo;
        }, '');
        document.getElementById('problems').innerHTML = problems;
        document.getElementById('date').innerHTML = new Date(state.happening[0].date).toLocaleString('en-US', { month: 'long', day: 'numeric' })
        document.getElementById('clock').innerHTML = new Date(state.happening[0].date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        if (state.picture) {
            document.getElementById('checkPhoto').classList.remove("off");
            document.getElementById('checkPhoto').classList.add("on");
        } else {
            document.getElementById('checkPhoto').classList.remove("on");
            document.getElementById('checkPhoto').classList.add("off");
        }
        if (state.map) {
            document.getElementById('checkMap').classList.remove("off");
            document.getElementById('checkMap').classList.add("on");
        } else {
            document.getElementById('checkMap').classList.remove("on");
            document.getElementById('checkMap').classList.add("off");
        }
        fetch(`${document.location.origin}/api/intersection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'latitude': state.map[0][0], 'longitude': state.map[0][1] }),
        }).then(response => {
            response.json().then(json => {
                document.getElementById('intersection').innerHTML = json.major;
            })
        })
    }

    get template() {
        var problems = this.problems;
        return (`
    <div class="screen1 visible">
          <div class="progLine"><div class="progress prog6"></div></div>
          <h1>${this.props.heading}</h1>
                      <div class="summary">
                <h2>Problems</h2>
                <div id="problems">                
                </div>
                <div class="linebreak"></div>
                <h2>Date and time</h2>
                <div class="options third12">
                    <li><em id="date"></em></li>
                </div>
                <div class="options third3">
                    <li><em id="clock"></em></li>
                </div>
                <div class="linebreak"></div>
                <div>         
                    <div class="options half1">
                        <li><em>Photo</em></li>
                        <div id="checkPhoto" class="check"></div>
                    </div>
                    <div class="options half2">
                        <li><em>Location</em></li>
                        <div id="checkMap" class="check"></div>
                    </div>
                </div>
                <div class="linebreak"></div>
                <div id="intersection"><div>
            </div>        
        </div>   
      </div>
      `
        )
    }
}
import * as React from 'react';
import './Calculator.css';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { callWebService } from '../../services/ws-services';
const moment = require('moment');

export class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showCountrySelectCount: 1,
            country1: '',
            country2: '',  
            country3: '', 
            sumStrah: '', 
            insuranceProgramm: 1, 
            beginDate: '', 
            endDate: '', 
            birthDate: '', 
            rprogSrok: '', 
            rprogMaxDays: '', 
            email: '',
            multivisit: false,
            countries: [ country ({label: '', value: '', territory: ''})]
        }
    }

    getCountry = async () => {
        const sessionId = sessionStorage.getItem('sessionId');
        let countries = [
            country({ label:  , value , territory })
          ];

        let body = 
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ffinlife/ws">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
           '<ws:cabCountryRequest>' +
              '<ws:sessionId>'+ sessionId +'</ws:sessionId>' +
           '</ws:cabCountryRequest>' +
        '</soapenv:Body>' +
     '</soapenv:Envelope>';

        console.log(body)

        const response = await callWebService(body);

        console.log('Country response:', response);

        this.setState({ label: response.getElementsByTagName('ns2:codeOfCountry')[0].value });
        this.setState({ value: response.getElementsByTagName('ns2:nameOfCountry')[0].value });
        this.setState({ territory: response.getElementsByTagName('ns2:territoryCountry')[0].value });
    }

    calculate = async () => {
        const sessionId = sessionStorage.getItem('sessionId');
        let { 
            country1, 
            country2, 
            country3, 
            sumStrah, 
            insuranceProgramm, 
            beginDate, 
            endDate, 
            birthDate, 
            rprogSrok, 
            rprogMaxDays, 
            email
        } = this.state;

        
        beginDate = moment(beginDate).format('DD.MM.YYYY');
        endDate = moment(endDate).format('DD.MM.YYYY');
        birthDate = moment(birthDate).format('DD.MM.YYYY');

        let body = 
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ffinlife/ws">'+
            '<soapenv:Header/>'+
            '<soapenv:Body>'+
            '<ws:calculatorFreedomTravelRequest>'+
                '<ws:sessionId>' + sessionId + '</ws:sessionId>'+
                '<ws:country1>' + country1 + '</ws:country1>'+
                '<ws:country2>' + country2 + '</ws:country2>'+
                '<ws:country3>' + country3 + '</ws:country3>'+
                '<ws:sumStrah>' + sumStrah + '</ws:sumStrah>'+
                '<ws:insuranceProgramm>' + insuranceProgramm + '</ws:insuranceProgramm>'+
                '<ws:beginDate>' + beginDate + '</ws:beginDate>'+
                '<ws:endDate>' + endDate + '</ws:endDate>'+
                '<ws:birthDate>' + birthDate + '</ws:birthDate>'+
                '<ws:rprogSrok>' + rprogSrok + '</ws:rprogSrok>'+
                '<ws:rprogMaxDays>' + rprogMaxDays + '</ws:rprogMaxDays>'+
                '<ws:email>' + email + '</ws:email>'+
            '</ws:calculatorFreedomTravelRequest>'+
            '</soapenv:Body>'+
        '</soapenv:Envelope>';

        console.log(body)

        const response = await callWebService(body);

        console.log('Calculator response:', response);

        this.setState({ strahPremiya: response.getElementsByTagName('ns2:premKz')[0].value });
    }

    onAddDestinationCountryClick = () => {
        const showCountrySelectCount = this.state.showCountrySelectCount + 1;
        if(showCountrySelectCount < 4) {
            this.setState({ showCountrySelectCount });
        }
    }

    onCountry1Change = (event) => {
        this.setState({ country1: event.target.value })
    }

    onCountry2Change = (event) => {
        this.setState({ country2: event.target.value })
    }

    onCountry3Change = (event) => {
        this.setState({ country3: event.target.value })
    }

    onMultiVisitChange = (event) => {
        this.setState({ multivisit: !this.state.multivisit })
    }

    onBeginDateChange = (event) => {
        this.setState({ beginDate: event.target.value })  
    }

    onEndDateChange = (event) => {
        this.setState({ endDate: event.target.value })  
    }

    onBirthDateChange = (event) => {
        this.setState({ birthDate: event.target.value })  
    }

    onSumStrahChange = (event) => {
        this.setState({ sumStrah: event.target.value })  
    }

    onFinish = async () => {
        this.props.onFinish(this.state);
    }

    render(){
        const { 
            showCountrySelectCount,
            country1, 
            country2, 
            country3, 
            sumStrah, 
            insuranceProgramm, 
            beginDate, 
            endDate, 
            birthDate, 
            rprogSrok, 
            rprogMaxDays, 
            email,
            strahPremiya,
            multivisit
        } = this.state;

        console.log(this.state)

        return (
            <div>
                <div className="container">
                    <div>
                        <div className="center">
                            <br/>  
                            <h2>Медицинское страхование туристов</h2>
                            <br/>
                        </div>
                        <div className="row">
                        <div className="col-50 ">
                            <label for="country1"><i className="fa fa-user"></i> Куда вы направляетесь?</label>
                            <input type="text" id="country1" name="country1" placeholder="Direction" onClick={this.getCountry} value={country1} onChange={this.onCountry1Change}/>
                            { 
                                showCountrySelectCount > 1 && 
                                <input type="text" id="country2" name="country2" placeholder="Direction" value={country2} onChange={this.onCountry2Change}/>
                            }
                            { 
                                showCountrySelectCount > 2 && 
                                <input type="text" id="country3" name="country3" placeholder="Direction" value={country3} onChange={this.onCountry3Change}/>
                            }
                        </div>
                        <div className="col-50">
                            <button onClick={this.onAddDestinationCountryClick} className="btn2">
                                + добавить страну
                            </button>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                <label>
                                    <input type="checkbox" checked={multivisit} onClick={this.onMultiVisitChange} name="multivisit"/> Многократная поездка
                                </label>
                            </div>
                            <div className="col-50">
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                <label for="beginDate"><i className="fa fa-envelope"></i> Когда уезжаете?</label>
                                <input className="min-today" id="min" type="date" value={beginDate} onChange={this.onBeginDateChange}/>
                            </div>
                            <div className="col-50">
                                <label for="endDate">Когда возращаетесь?</label>
                                <input className="min-today" id="max" type="date" value={endDate} onChange={this.onEndDateChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                <label for="strahSum"><i className="fa fa-address-card-o"></i> Страховая сумма:</label>
                                <input type="text" className="inputSumStrah" value={sumStrah} onChange={this.onSumStrahChange} placeholder="$500000"/>
                            </div>
                            <div className="col-50">
                                <label for="bdate">Дата рождения:</label>
                                <input className="b-day" type="date" value={birthDate} onChange={this.onBirthDateChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                
                            </div>
                            <div className="col-50">
                                
                            </div>
                        </div>
                        
                        <div className="center">
                            <button onClick={this.calculate} className="btn">
                                Рассчитать
                            </button>   
                        </div>    
                        
                        
                        <div classNameName="row">
                            <div className="col-50">
                                <label for="ccnum">Страховая премия:</label> 
                                <div className="centerInput">
                                <input className="inputStrahPremiya" type="text" disabled="true" placeholder="$10000" value={strahPremiya}/>  
                                </div>
                            </div>
                            <div className="col-50">
                                
                            </div>
                        </div>    
                        
                        <div className="center">
                            <button className="btn" onClick={ this.onFinish }>
                                Оформить сейчас
                            </button>
                        </div>    
                    </div>
                </div>
            </div>
        );
    }

}


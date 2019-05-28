import * as React from 'react'
import './Calculator/Calculator.css'
import './Registration/FizLicoRegForm.css'
import './Registration/YurLicoRegForm.css'
import { Calculator } from './Calculator/Calculator';
import { FizLicoRegForm } from './Registration/FizLicoRegForm';
import { YurLicoRegForm } from './Registration/YurLicoRegForm';

export class Initial extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            isFizLico: true,
            calcData: {
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
                multivisit: false
            },
            regData: {
                country1: '',
                country2: '',  
                country3: '', 
                rprogramm: '',  
                rprogSrok: '', 
                progMaxDays: '', 
                dateStart: '', 
                dateEnd: '', 
                curRate: '', 
                fioKir: '', 
                fioLat: '', 
                inn: '', 
                resId: '', 
                address: '', 
                sex: '', 
                dateBirth: '', 
                region: '', 
                fioKir2: '', 
                fioLat2: '', 
                iin2: '', 
                resId2: '', 
                address2: '', 
                sex2: '', 
                dateBirth2: '', 
                region2: '', 
                passportNum: '', 
                passportGive: '', 
                passportDate: '', 
                passportDateEnd: '', 
                doc_type: '', 
                passportNum2: '', 
                passportGive2: '', 
                passportDate2: '', 
                passportDateEnd2: '', 
                mobilePhone: '', 
                phone: '', 
                email: '', 
                mobilePhon: '',
                phone2: '', 
                email2: '', 
            },
            paymentData: {

            }
        }
    }

    onCalculatorFinish = (data) => {
        this.setState({
            calcData: data,
            step: 2
        })
    }

    onFizLicoRegFinish = (data) => {
        this.setState({
            regData: data,
            step: 3
        })
    }

    onYurLicoRegFinish = (data) => {
        this.setState({
            regData: data,
            step: 3
        })
    }

    onFizLicoPaymentFinish = (data) => {
        this.setState({

        })
    }

    onYurLicoPaymentFinish = (data) => {
        this.setState({

        })
    }

    onBackPressed = () => {
        this.setState({
            step: this.state.step - 1
        });
    }

    render(){
        const { step, isFizLico } = this.state;
        return (
            <div>
                { step == 1 && 
                    <Calculator onFinish = { this.onCalculatorFinish }/>
                }
                
                { step == 2 && isFizLico &&
                    <FizLicoRegForm onFinish = { this.onFizLicoRegFinish }/>
                }
                { step == 2 && !isFizLico &&
                    <YurLicoRegForm onFinish = { this.onYurLicoRegFinish }/>
                }

                {/* { step == 3 && isFizLico == true &&
                        <FizLicoPaymentForm onFinish = { this.onFizLicoPaymentFinish }/> kaida?
                }
                { step == 3 && isFizLico == false &&
                        <YurLicoPaymentForm onFinish = { this.onYurLicoPaymentFinish }/> bul ekui ali istegem zhok
                } */}
            </div>
        )
    }
}

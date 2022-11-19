import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Component, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";

type state = {
  dados: any[]
  }

class TelaLogin extends Component<any>{
  private email = ""
  private senha = ""
  private teste = []
  private tpUser = ""

  constructor(props) {
    super(props);
    this.state = {
      dados: []
    }
    this.receberEmail = this.receberEmail.bind(this);
    this.receberSenha = this.receberSenha.bind(this);
  }
  

  receberEmail(event) {
      const target = event.target
      this.email = target.value;
  }

  receberSenha(event) {
    const target = event.target
    this.senha = target.value;
  }

  componentDidMount(): void {
      axios.get('http://localhost:3001/users').then(response => {
        let dadosBanco = response.data
        this.setState({
          dados: dadosBanco
        })
        this.teste = dadosBanco
        console.log(this.teste);
        
      })
    }

      login(){
        this.teste.forEach((user) => {
          console.log('TESTE');
          if(user.email == this.email){
            if(user.senha == this.senha){
              if(user.tipoUsuario == "User"){
                  this.tpUser = "User"
              }else{
                this.tpUser = "Adm"
              }
            }
          }
        }) 
       console.log(this.tpUser);
      }
      



          // .then(() => {
          //     const data = this.teste;
          //     console.log(data);
          //     debugger
          //     if (data.length === 0) {
          //         Swal.fire({
          //             title: `Error`,
          //             html:
          //                 ' <b>User not found</b>'
          //         })
          //     } else if (data[0].senha_acesso === this.senha) {
          //         if (data[0].nivel_acesso === 1) {
          //             localStorage.setItem('idUsuario',`${data[0].id}`)
          //             localStorage.setItem('nomeUsuario',`${data[0].nome}`)
          //             localStorage.setItem('nivelAcesso',`${data[0].nivel_acesso
          //             }`)
          //             this.navigate("/Index")
          //         }
          //         else {
          //             localStorage.setItem('idUsuario',`${data[0].id}`)
          //             localStorage.setItem('nomeUsuario',`${data[0].nome}`)
          //             localStorage.setItem('nivelAcesso',`${data[0].nivel_acesso
          //             }`)
          //             this.navigate("/Calculo")
                      
          //         }
          //     } else if (data[0].senha_acesso !== this.senha) {
          //         Swal.fire({
          //             title: `Error`,
          //             html:
          //                 ' <b>Incorrect Password</b> '
          //         })
          //     }
          // });


    render() {
        return (
            <Container>
                <Form>
                    <Row>
                        <h1 className='text-center' style={{ marginTop: "50px" }}>Login</h1>
                    </Row>
                </Form>

                <Form>
                    <Row>
                        <Col md={{ span: 6, offset: 3}}>
                            <h5 className="card-title"  style={{ marginTop: "30px" }}>Email</h5>
                            <input type='text' className='input form-control form-control-lg inputGroup-sizing-sm' id="EmailUser" onChange={this.receberEmail}
                            placeholder="Email"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ span: 6, offset: 3}}>
                            <h5 className="card-title"  style={{ marginTop: "30px" }}>Password</h5>
                            <input type='password' className='input form-control form-control-lg inputGroup-sizing-sm' id="SenhaUser" onChange={this.receberSenha}
                            placeholder="Password"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ span: 6, offset: 3}}>
                            <Button className="botao-resultado" style={{margin:'10px', marginTop:'15px'}} size="lg" onClick={this.login}>Save</Button>
                        </Col>
                    </Row>

                </Form>
            </Container>
        )}
    }
export default TelaLogin;
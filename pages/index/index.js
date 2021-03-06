import React, { Component } from 'react'
import apiTool from '../../command/apiTool';
import {Button} from 'antd'
import styles  from './index.less'
import Link from 'next/link'
import createDva from '../../command/createDva';
import FormModal from '../../components/FormModal/index';

class Index extends Component {

  constructor(props) {
    super(props);
    this.formModalArr = this.initModal()
  }
  
  initModal = () =>{
    return ['测试1','测试2','测试3'].map((e,i)=>{
      return createDva(['test' + i])((props)=><FormModal title={e} {...props}/>)
    })
  }

  onTest1 = (i) =>{
    apiTool.showModal(this,'test' + i)
  }

  static async getInitialProps(props) {
    console.log('输出123123')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('输出当前刷新')  
  }

  onUpdate = () =>{
    this.forceUpdate()
  }

  renderModalArr = () =>{
    return this.formModalArr.map((e)=>{
      const FormMoalView = e
      return <FormMoalView/>
    })
  }

  renderModalButton = () =>{
    return this.formModalArr.map((e,i)=>{
      return <Button onClick={()=>this.onTest1(i)}>{'打开测试modal' + i + '本页面不走生命周期'}</Button>
    })
  }

  render() {
    return (
      <div className={styles.main}>
        {this.renderModalButton()}
        {this.renderModalArr()}
        <Button onClick={this.onUpdate}>强制刷新:本页面走生命周期</Button>
        <Link href={'/test1?id=1&a=1'}>带参数跳转</Link>
        <Link href={'/test2'}>接口测试1</Link>
        <Link href={'/test2?id=1'}>接口传参测试</Link>
        <Link href={'/formTest'}>表单演示(共用同一个表单数据源)</Link>
        <Link href={'/formTest1'}>表单演示(使用各自表单数据源)</Link>
        <Link href={'/mockTest'}>mock演示</Link>
      </div>
    )
  }
}

export default createDva([])(Index)
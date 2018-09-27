import React from 'react'
import Form from 'react-jsonschema-form'
import * as Schemas from '../../schema/forms'
import Layout from '../../components/layout'
import '../../components/form/form.css'

class FormIndex extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const page = window.location.pathname.split('/').reverse()[0]
    const formSchema = Schemas[page ? page : 'login']
    return (
      <>
        <Layout>
          <div className="center w-100  bg-very-very-light shadow-light pa4">
            <Form schema={formSchema.schema} uiSchema={formSchema.uiSchema}>
              <div className="form-group flex justify-end">
                <button type="submit">{formSchema.schema.submitButton}</button>
              </div>
            </Form>
          </div>
        </Layout>
      </>
    )
  }
}

export default FormIndex

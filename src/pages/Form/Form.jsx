import { CirclePlusIcon } from 'assets/svgs/svg'
import Button from 'components/common/Button/Button'
import EditProfileCard from 'components/common/EditProfieCard/EditProfileCard'
import Errormsg from 'components/common/formik/ErrorMsg/Errormsg'
import FormikControl from 'components/common/formik/FormikControl'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FileUploader } from 'react-drag-drop-files'
import * as Yup from 'yup'
import "./Form.scss"

const Form = () => {
    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            trait: '',
            maxint: '',
            minint: '',
            totalsupply: '',
            curveness: '',
        },

        onSubmit(values) {
            console.log(values)
        },
    })
    return (
        <>
            <div className='formPage py-4'>
                <h2 className='text-white'>Form</h2>
                <form className='mt-5' onSubmit={Formik.handleSubmit}>
                    <Row className='justify-content-between'>
                        <Col xs={12} xl={7} xxl={5}>
                            <Row>
                                <Col xs={12}>
                                    <FormikControl
                                        label="Name"
                                        control="name"
                                        name="name"
                                        placeholder="Name"
                                        className="mb-4"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        onBlur={formik.handleBlur}
                                        minLength="3"
                                        maxLength="30"
                                    >
                                        {formik?.touched?.name && formik.errors?.name ? (
                                            <Errormsg style={{ textAlign: "left" }}>
                                                {formik?.errors?.name}
                                            </Errormsg>
                                        ) : null}
                                    </FormikControl>
                                </Col>
                                <Col xs={12}>
                                    <label htmlFor="" className='form-label'>Files Upload</label>
                                    <div className='mb-4 UploadFilesform'>
                                        <FileUploader
                                            types={["JPG", "PNG", "GIF"]}
                                            maxSize={5}
                                            name="profileImage"
                                            classes={`drop_area drop_zone ${formik?.values?.profileImage && "update"
                                                }`}
                                            children={
                                                <>
                                                    <EditProfileCard />
                                                </>
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <label htmlFor="" className='form-label'>Trait</label>
                                    <Row>
                                        <Col xs={4}>
                                            <FormikControl
                                                control="trait"
                                                name="trait"
                                                placeholder="Trait: int"
                                                className="mb-4"
                                                onChange={formik.handleChange}
                                                value={formik.values.trait}
                                                onBlur={formik.handleBlur}
                                                minLength="3"
                                                maxLength="30"
                                            >
                                                {formik?.touched?.trait && formik.errors?.trait ? (
                                                    <Errormsg style={{ textAlign: "left" }}>
                                                        {formik?.errors?.trait}
                                                    </Errormsg>
                                                ) : null}
                                            </FormikControl>
                                        </Col>
                                        <Col xs={3}>
                                            <FormikControl
                                                control="maxint"
                                                name="maxint"
                                                placeholder="max : int"
                                                className="mb-4"
                                                onChange={formik.handleChange}
                                                value={formik.values.maxint}
                                                onBlur={formik.handleBlur}
                                                minLength="3"
                                                maxLength="30"
                                            >
                                                {formik?.touched?.maxint && formik.errors?.maxint ? (
                                                    <Errormsg style={{ textAlign: "left" }}>
                                                        {formik?.errors?.maxint}
                                                    </Errormsg>
                                                ) : null}
                                            </FormikControl>
                                        </Col>
                                        <Col xs={3}>
                                            <FormikControl
                                                control="minint"
                                                name="minint"
                                                placeholder="min: int"
                                                className="mb-4"
                                                onChange={formik.handleChange}
                                                value={formik.values.minint}
                                                onBlur={formik.handleBlur}
                                                minLength="3"
                                                maxLength="30"
                                            >
                                                {formik?.touched?.minint && formik.errors?.minint ? (
                                                    <Errormsg style={{ textAlign: "left" }}>
                                                        {formik?.errors?.minint}
                                                    </Errormsg>
                                                ) : null}
                                            </FormikControl>
                                        </Col>
                                        <Col xs={2}>
                                            <button type="button" className="inputAdd_Icon">
                                                <CirclePlusIcon />
                                            </button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <FormikControl
                                        label="Total supply: int"
                                        control="totalsupply"
                                        name="totalsupply"
                                        placeholder="Total supply: int"
                                        className="mb-4"
                                        onChange={formik.handleChange}
                                        value={formik.values.totalsupply}
                                        onBlur={formik.handleBlur}
                                        minLength="3"
                                        maxLength="30"
                                    >
                                        {formik?.touched?.totalsupply && formik.errors?.totalsupply ? (
                                            <Errormsg style={{ textAlign: "left" }}>
                                                {formik?.errors?.totalsupply}
                                            </Errormsg>
                                        ) : null}
                                    </FormikControl>
                                </Col>
                                <Col xs={12}>
                                    <FormikControl
                                        label="Curveness"
                                        control="curveness"
                                        name="curveness"
                                        placeholder="Curveness: int"
                                        className="mb-4"
                                        onChange={formik.handleChange}
                                        value={formik.values.curveness}
                                        onBlur={formik.handleBlur}
                                        minLength="3"
                                        maxLength="30"
                                    >
                                        {formik?.touched?.curveness && formik.errors?.curveness ? (
                                            <Errormsg style={{ textAlign: "left" }}>
                                                {formik?.errors?.curveness}
                                            </Errormsg>
                                        ) : null}
                                    </FormikControl>
                                </Col>

                                <Col xs={12} className="mt-5">
                                    <Button
                                        isLoading={isLoading}
                                        type="submit"
                                        text="Submit"
                                        fluid={true}
                                        disabled={isLoading}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </form>
            </div>
        </>
    )
}

export default Form

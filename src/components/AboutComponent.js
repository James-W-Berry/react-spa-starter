import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function About(props) {

    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <RenderLeader leader={leader} />
        );
    });

    function RenderLeader({leader}) {
        return(
            <div key={leader.id} className="col-12 mt-2">
                <Media tag="li">
                    <Media left top>
                        <Media object src={baseUrl + leader.image} alt={leader.name} />
                    </Media>
                    <Media body className="ml-5">
                        <Media heading>{leader.name}</Media>
                        <p>{leader.designation}</p>
                        <p>{leader.description}</p>
                    </Media>
                </Media>
            </div>
        );
    }

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Lorem ipsum dolor sit amet, imperdiet maiestatis adolescens has ut, vix alii nisl lucilius cu, quidam forensibus pri cu. Graeco constituto quo no, mei modus philosophia vituperatoribus ei. Eu viderer deseruisse eos. Cum cu adipisci petentium, cibo admodum percipit ius ad. Et pro congue fabellas.</p>
                    <p>Probo suscipit usu ut. Per at fuisset postulant neglegentur, eu pro bonorum accommodare. Posidonium definitionem sit an, augue copiosae aliquando an vis. Vocibus postulant suavitate cu eam, an tation iisque fastidii est. Pri no choro eirmod.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">Company Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$123,456,789</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">100</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Sea sale autem maiestatis te, nam sonet nemore ne.</p>
                                <footer className="blockquote-footer">Quoted,
                                <cite title="Source Title">Vis ex repudiare ullamcorper, in nulla suavitate est,
                                    Author, Publication, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Stagger in>
                        <Media list>
                            <Fade in>
                                {leaders}
                            </Fade>
                        </Media>
                    </Stagger>
                </div>
            </div>
        </div>
    );
}

export default About;    
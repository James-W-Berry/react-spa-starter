import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCatalogItem({ product, onClick }) { 
    return(
        <Card>
            <Link to={`/catalog/${product.id}`} >
                <CardImg width="100%" object src={baseUrl + product.image} alt={product.name} />
                <CardImgOverlay>
                    <CardTitle>{product.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Catalog = (props) => {
    const catalog = props.products.products.map((product) => {
        return (
            <div key={product.id} className="col-12 col-md-5 m-1">
               <RenderCatalogItem product={product} />
            </div>
        )
    });

    if(props.products.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.products.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.products.errMess}</h4>
                </div>
            </div>
        ); 
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Catalog</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Catalog</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {catalog}
                </div>
            </div>
        );
    }
}

    
export default Catalog;
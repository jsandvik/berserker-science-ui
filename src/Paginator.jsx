import React from "react";
import Pagination from 'react-bootstrap/Pagination';
var ReactUltimatePagination = require('react-ultimate-pagination');

function Page(props) {
  return (
    <Pagination.Item
    active={props.isActive}
    onClick={props.onClick}
      disabled={props.disabled}
    >{props.value}</Pagination.Item>
  );
}

function Ellipsis(props) {
  return <Pagination.Ellipsis disabled />
}

function FirstPageLink(props) {
  return <Pagination.First onClick={props.onClick} disabled={props.disabled} />
}

function PreviousPageLink(props) {
  return <Pagination.Prev onClick={props.onClick} disabled={props.disabled} />
}

function NextPageLink(props) {
  return <Pagination.Next onClick={props.onClick} disabled={props.disabled} />
}

function LastPageLink(props) {
    return <Pagination.Last onClick={props.onClick} disabled={props.disabled} />
}

function Wrapper(props) {
  return <Pagination className="justify-content-center">{props.children}</Pagination>
}

var itemTypeToComponent = {
  'PAGE': Page,
  'ELLIPSIS': Ellipsis,
  'FIRST_PAGE_LINK': FirstPageLink,
  'PREVIOUS_PAGE_LINK': PreviousPageLink,
  'NEXT_PAGE_LINK': NextPageLink,
  'LAST_PAGE_LINK': LastPageLink
};

const Paginator = ReactUltimatePagination.createUltimatePagination({
  itemTypeToComponent: itemTypeToComponent,
  WrapperComponent: Wrapper,
});

export default Paginator;
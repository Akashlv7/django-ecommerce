import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ page, pages, keyword='', isAdmin=false }) {

    if(keyword){
        keyword = keyword.split('&')[0].split('=')[1]
    }

  return (
    pages > 1 && (
        <Pagination size='md' className='d-flex'>

            { [...Array(pages).keys()].map((x) => (
                <LinkContainer 
                    key={ x + 1 }
                    to={!isAdmin ? 
                        {
                            pathname: '/',
                            search: `keyword=${keyword}&page=${ x + 1 }`
                        } 
                    : 
                        {
                            pathname: '/admin/productlist/',
                            search: `keyword=${keyword}&page=${ x + 1 }`
                        }
                }
                >
                    <Pagination.Item active={ page === x + 1 }>{ x + 1 }</Pagination.Item>

                </LinkContainer>
            )) }

        </Pagination>
    )  
  )
}

export default Paginate

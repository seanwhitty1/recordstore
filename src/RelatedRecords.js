import './Recordgrid.css'
import Record from './Record'

function RelatedRecords({collection}){
      return(
            <>
            <div className='related-recordgrid-container'>
            {collection.map     
            (r => <Record className='related-recordgrid-item lg:size-150px md:size-100px sm:size-100px' id={r.id} artists={r.artists} title={r.title} price={r.price} descr={r.descr} genre={r.genre} images={r.images} /> ) }
            </div>
           </>
        )
    }

export default RelatedRecords;
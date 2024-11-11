export interface Author {
  name: string;
  affiliation: string;
}


export default function AuthorList({ authors }: { authors: Author[] }) {
    let uniqueAffiliations = authors.map(author => author.affiliation).filter((value, index, self) => self.indexOf(value) === index);
    const affiliationIndices = uniqueAffiliations.reduce((acc, affiliation, index) => {
        acc[affiliation] = index + 1; // Start indexing from 1 for superscripts
        return acc;
    }, {} as { [key: string]: number });
  return (
    <div className="pb-4">
          <div className="text-center text-xl">
              {authors.map((author, index) => (
                  <span key={index}>
                      {author.name}<sup>{affiliationIndices[author.affiliation]}</sup>
                      {index < authors.length - 1 ? ', ' : ''}
                  </span>
              ))}
          </div>

          {/* Display affiliation list */}
          <div className="text-center text-lg">
              {uniqueAffiliations.map((affiliation, index) => (
                  <span key={index}>
                      <sup>{index + 1}</sup> {affiliation}
                      {index < uniqueAffiliations.length - 1 ? ', ' : ''}
                  </span>
              ))}
          </div>
    </div>
  );
}
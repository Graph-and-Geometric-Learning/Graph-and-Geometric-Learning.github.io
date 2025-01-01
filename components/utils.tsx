export { Badges } from './badges';
export interface Author {
  name: string;
  affiliation: string[];
}


export function AuthorList({ authors }: { authors: Author[] }) {
    // Flatten the affiliations and get unique ones
    let uniqueAffiliations = Array.from(new Set(authors.flatMap(author => author.affiliation)));
    const affiliationIndices = uniqueAffiliations.reduce((acc, affiliation, index) => {
        acc[affiliation] = index + 1; // Start indexing from 1 for superscripts
        return acc;
    }, {} as { [key: string]: number });

    return (
        <div className="pb-0">
            <div className="text-center text-xl">
                {authors.map((author, index) => (
                    <span key={index}>
                        {author.name}
                        {author.affiliation.map((aff, i) => (
                            <sup key={i}>{affiliationIndices[aff]}</sup>
                        ))}
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


export function Authors({ authors }: { authors: string }) {
    // authors in the format: author1, affiliation1; affiliation2; author2, affiliation3; ...
    const authorList: Author[] = [];
    let currentAuthor: Author | null = null;

    authors.split(';').forEach(part => {
        const [name, affiliation] = part.split(',');

        if (affiliation !== undefined) {
            // New author with affiliation
            if (currentAuthor) {
                authorList.push(currentAuthor);
            }
            currentAuthor = { name: name.trim(), affiliation: [affiliation.trim()] };
        } else {
            if (!currentAuthor) {
                throw new Error(`Invalid author string: ${authors}`);
            }
            // Additional affiliation for the current author
            currentAuthor.affiliation.push(part.trim());
        }
    });

    if (currentAuthor) {
        authorList.push(currentAuthor);
    }

    return <AuthorList authors={authorList} />;
}
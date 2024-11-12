# Utility functions like chunk_text, build_prompt, etc.

PROMPT_LIMIT = 3750

def chunk_text(text, chunk_size=200):
    # Split the text by sentences to avoid breaking in the middle of a sentence
    sentences = text.split('. ')
    
    chunks = []
    current_chunk = ""

    for sentence in sentences:
        # Check if adding the next sentence exceeds the chunk size
        if len(current_chunk) + len(sentence) <= chunk_size:
            current_chunk += sentence + '. '
        else:
            # If the chunk reaches the desired size, add it to the chunks list
            chunks.append(current_chunk)
            current_chunk = sentence + '. '

    # Add the last chunk if it's not empty
    if current_chunk:
        chunks.append(current_chunk)

    return chunks

def build_prompt(query, context_chunks):
    prompt_start = (
        "Answer the question based on the context below. If you don't know the answer based on the context provided below, just respond with 'I don't know' instead of making up an answer. Don't start your response with the word 'Answer:'"
        "Context:\n"
    )
    prompt_end = (
        f"\n\nQuestion: {query}\nAnswer:"
    )

    prompt = ""
    # append contexts until hitting limit
    for i in range(1, len(context_chunks)):
        if len("\n\n---\n\n".join(context_chunks[:i])) >= PROMPT_LIMIT:
            prompt = (
                prompt_start +
                "\n\n---\n\n".join(context_chunks[:i-1]) +
                prompt_end
            )
            break
        elif i == len(context_chunks)-1:
            prompt = (
                prompt_start +
                "\n\n---\n\n".join(context_chunks) +
                prompt_end
            )
    return prompt   

    ########### my helpers
def get_pdf_text(PdfReader, pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text


def get_text_chunks(CharacterTextSplitter, text):
    text_splitter = CharacterTextSplitter(
        separator="\n", chunk_size=1000, chunk_overlap=200, length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    # embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

import faiss
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_openai import OpenAIEmbeddings

FAISS_INDEX = faiss.IndexFlatL2(len(OpenAIEmbeddings().embed_query("my sea master")))

LOCAL_STORAGE_PATH = "/tmp/faiss"
FAISS_INDEX = "sea_master_faiss_index"

# vector_store = FAISS(
#     embedding_function=OpenAIEmbeddings(),
#     index=FAISS_INDEX,
#     docstore= InMemoryDocstore(),
#     index_to_docstore_id={}
# )

def save_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    # embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    vectorstore.save_local(LOCAL_STORAGE_PATH, FAISS_INDEX)
    # save to local
    return vectorstore

def get_vectorstore():
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.load_local(LOCAL_STORAGE_PATH, embeddings, FAISS_INDEX)
    return vectorstore
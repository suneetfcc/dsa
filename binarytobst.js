class treenode {
    constructor(id, amount, left = null, right = null) {
        this.id = id;
        this.amount = amount;
        this.left = left;
        this.right = right;
    }
}


function postOrder(root) {
    if (root !== null) {
        return postOrder(root.left) +
            postOrder(root.right) +
            `${root.id}(${root.amount}) `;
    } else return "";
}

function inOrder(root) {
    if (root !== null) {
        return inOrder(root.right) +
            `${root.id}(${root.amount}) ` +
            inOrder(root.left);
    } else return "";
}

// find the first node in the post order traversal of tree
function findPostorderRoot(tree) {
    if(tree) {
        let lt = findPostorderRoot(tree.left);
        let rt = findPostorderRoot(tree.right);
        if (lt === null && rt === null ) {
           if(tree.left === null && tree.right === null) {
            return tree;
           }
        } else return lt || rt;
    } else return null;
}

function convertToBST(tree, newtree) {
    if (tree){
        convertToBST(tree.left, newtree);
        convertToBST(tree.right, newtree);
        insertintoBST(newtree, tree);          
    }
    
    return newtree;
}



/*
insert a node into a BST
leftOrRight: false means left, true means right
*/
function insertintoBST(root, node, parent=null, leftOrRight=false) {
   if (root == node) {
       node.left = node.right = null;
       return;
   }
   if (root !== null) {
       if (root.amount > node.amount) {
           insertintoBST(root.right, node, root, true);
       } else {
           insertintoBST(root.left, node, root, false);
       }
   } else {
        node.left = node.right = null;
        if(leftOrRight) {
            parent.right = node;
        } else {
            parent.left = node;
        }
   }
}


//
// Tests
// invariant:   memory is allocated (via new) only for tree1 and never for tree2
// correctness: if tree2 is correctly converted the inOrder traversal of tree2 should be sorted by amount
//

/* tree1:
                   1(500)
                     |
            --------------------
           |                   |
        2(200)              4(300)
           |                   |
           -----           ---------
               |          |        |
            3(700)      5(100)  7(400)
                         |
                    ----- 
                   |     
                6(600)

*/               

tree1 = new treenode(1,500, new treenode(2,200, null, new treenode(3,700)), new treenode(4,300, new treenode(5,100, new treenode(6,600), null), new treenode(7,400)));
tree2 = findPostorderRoot(tree1);
convertToBST(tree1, tree2);
inOrder(tree2);
